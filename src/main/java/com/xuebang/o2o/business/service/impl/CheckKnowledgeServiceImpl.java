package com.xuebang.o2o.business.service.impl;

import com.xuebang.o2o.business.dao.KnowledgeDao;
import com.xuebang.o2o.business.entity.KnowBaseInfo;
import com.xuebang.o2o.business.entity.Knowledge;
import com.xuebang.o2o.business.service.CheckKnowledgeService;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/11/9.
 */
@Service
@Transactional
public class CheckKnowledgeServiceImpl implements CheckKnowledgeService {
    /**
     * 专题知识点的list
     */
    private List<Knowledge> knowledges = new ArrayList<>();


    @Autowired
    private KnowledgeDao knowledgeDao;

    @Override
    public String check(String filePath) throws IOException {
        boolean isE2007 = false;    //判断是否是excel2007格式
        if (filePath.endsWith("xlsx"))
            isE2007 = true;

        InputStream input = new FileInputStream(filePath);  //建立输入流
        Workbook wb = null;
        //根据文件格式(2003或者2007)来初始化
        if (isE2007)
            wb = new XSSFWorkbook(input);
        else
            wb = new HSSFWorkbook(input);

        //设置背景色为红色
        CellStyle style = wb.createCellStyle();
        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        style.setFillForegroundColor(HSSFColor.RED.index);


        /** 检查结果*/
        Boolean checkRresult = true;

        /** 所有知识点的map*/
        Map<String , List >  allKnows = new HashMap<>();
        //读取所有的sheet页
        /** 规定第一个sheet页必须是专题知识点  */
        for (int i = 0; i < wb.getNumberOfSheets(); i++) {
            boolean tempResult = true;
            if (i == 0) {
                if (wb.getSheetAt(i).getSheetName().indexOf("专题") > -1) {
                    //专题知识点的处理
                    tempResult =  knowledgeCheck(wb.getSheetAt(i), style ,allKnows);
                }else {
                    throw new  RuntimeException("第一个sheet页不是专题知识点");
                }

            } else {
                //同步知识点的处理
//                tempResult =  syncKnowledgeCheck(wb.getSheetAt(i));
            }


            if( checkRresult ){
                checkRresult = tempResult;
            }
        }

        /** 确认检查结果是否正确,正确就不输出错误批注的副本*/
        if ( !checkRresult ) {
            String filePathPrefix = filePath.substring( 0,filePath.lastIndexOf(".") );
            String filePathSuffix = filePath.substring(filePath.lastIndexOf(".") );
            FileOutputStream fout = null;
            try {
                fout = new FileOutputStream(filePathPrefix+"错误"+filePathSuffix);
                wb.write(fout);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }finally {
                try {
                    fout.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
        }

        return null;
    }


    /**
     * 专题知识点的处理
     *
     * @param sheet
     */
    private Boolean knowledgeCheck(Sheet sheet, CellStyle style , Map<String , List >  allKnows) {
        KnowBaseInfo knowBaseInfo = initKnowBaseInfoParam(sheet, style);

        System.out.println("专题知识点 《列号》 数据注册成功 ------->" + knowBaseInfo.toString());

        List<Knowledge> knowledges = new ArrayList<>() ;

        //检查结果
        Boolean checkRresult = true;

        /** 检查知识点*/
        for (int i = 1; i < sheet.getLastRowNum() + 1; i++) {
            Row row = sheet.getRow(i) ;
            //添加check规则
            boolean tempResult = true;
            tempResult =  knowNameCount(style, knowBaseInfo, row);
            if( checkRresult ){
                checkRresult = tempResult;
            }

        }


        /**导入知识点*/
        for (int i = 1; i < sheet.getLastRowNum() + 1; i++) {
            Row row = sheet.getRow(i);
            int flagNumer = 0;
            Knowledge knowledge = new Knowledge();
            for (int j = 0; j < (int) row.getLastCellNum() + 1; j++) {
                flagNumer = registerKnowledge(sheet, knowBaseInfo, row, flagNumer, knowledge, j);
            }
            if( flagNumer != 0 ){
                knowBaseInfo.getPosition2Objec().put( flagNumer , knowledge);
            }else {
                System.out.println( "行位置为 "+ i+1 + "，出现错误，请检查 ");
            }
            knowledges.add( knowledge );
        }

        allKnows.put( "knows" , knowledges );
//        knowledgeDao.save( knowledges );
        return   checkRresult ;
    }

    /**
     *  规则一
     * 同一行不能有两个知识点名称
     * @param style
     * @param knowBaseInfo
     * @param row
     * @return
     */
    private boolean knowNameCount(CellStyle style, KnowBaseInfo knowBaseInfo, Row row) {
        Boolean checkRresult = true;
        int flag = 0;
        for (Integer colPos : knowBaseInfo.getNameColPostion()){
            String value =  cellValue( row , colPos);
            if(! StringUtils.isBlank( value)){
                flag ++;
                if ( flag > 1 ){
                    row.getCell(colPos).setCellStyle( style );
                    checkRresult = false;
                    System.out.println( " 行row = " + row.getRowNum() + " 有多个知识点，请检查!" );
                }
            }
        }
        return  checkRresult;
    }

    /**
     *  构建专题知识点的对象，同时返回当前row的知识点名字所在的列位置
     * @param sheet
     * @param knowBaseInfo
     * @param row
     * @param flagNumer
     * @param knowledge
     * @param j
     * @return
     */
    private int registerKnowledge(Sheet sheet, KnowBaseInfo knowBaseInfo, Row row, int flagNumer, Knowledge knowledge, int j) {
        /** 列号 == 专题知识点序号*/
        if (j == knowBaseInfo.getKnowledgeNumber()) {
            knowledge.setNumber(cellValue(row, j)) ;
        } else if (j == knowBaseInfo.getSection()) { /**列号  == 学段*/
            knowledge.setSection( cellValue( row , j ));
        } else if (j == knowBaseInfo.getSubject()) {/**列号 == 学科*/
            knowledge.setSubject( cellValue( row , j) );
        } else if ( knowBaseInfo.getName2position().containsKey(columnHeadValue( j, sheet)) ) {/**列号 == 知识点名称的列号*/
            String cellValue = cellValue( row , j );
            if ( ! StringUtils.isBlank( cellValue)) {/**列数据不为空*/
                flagNumer = j ;
                if ( cellValue.indexOf( "<split-tag>" ) > -1) {//剔除<split-tag>
                    cellValue = cellValue.replace("<split-tag>","");
                }
                isLeaf(knowBaseInfo, knowledge, j);

                knowledge.setName( cellValue );
                Integer parentKey = j - 1;
                /**取出父级知识点*/
                if ( knowBaseInfo.getPosition2Objec().containsKey( parentKey ) ){
                    knowledge.setParent(  knowBaseInfo.getPosition2Objec().get( parentKey) );
                }
            }

        }
        return flagNumer;
    }

    /**
     * 判断专题知识点中，当前知识点是否是叶子节点
     * @param knowBaseInfo
     * @param knowledge
     * @param j
     */
    private void isLeaf(KnowBaseInfo knowBaseInfo, Knowledge knowledge, int j) {
        //判断是否是叶子节点
        // 当column +　1  不是知识点名字的列时，当前知识点就是叶子节点
        if( !knowBaseInfo.getNameColPostion().contains(j+1) ){
            knowledge.setIsLeaf( 1 );
        }else{
            knowledge.setIsLeaf( 0 );
        }
    }

    /**
     *  获取知识点序号
     *  获取 某行某列的值   因为序号有可能为 数字 类型 所有要做判断
      * @param row  行
     * @param j   列index
     * @return
     */

    private String cellValue(Row row, int j) {
        if( row == null || row.getCell( j )  == null ){
            return null;
        }

        if ( row.getCell(j).getCellType() == HSSFCell.CELL_TYPE_NUMERIC ) {
            return  String.valueOf(  row.getCell( j ).getNumericCellValue() ).trim();
        }
        return row.getCell(j).getStringCellValue().trim();
    }

    /**
     * 获取列头的值
     * @param j
     * @param sheet
     * @return
     */
    private String columnHeadValue(int j , Sheet sheet) {
        Row row = sheet.getRow(0);
        if ( row == null || row.getCell(j) == null) {
            return null;
        }

        return row.getCell(j).getStringCellValue();
    }

    private KnowBaseInfo initKnowBaseInfoParam(Sheet sheet, CellStyle style) {
        KnowBaseInfo knowBaseInfo = new KnowBaseInfo();
        Row oneRow = sheet.getRow(0);
        for (int i = 0; i < oneRow.getLastCellNum(); i++) {
            Cell cell = oneRow.getCell(i);
            switch (cell.getCellType()) {
                case HSSFCell.CELL_TYPE_STRING:
                    String value = cell.getStringCellValue();

                    knowBaseInfoRegister(knowBaseInfo, i, value);
                    break;
                case HSSFCell.CELL_TYPE_NUMERIC:
                    cell.setCellStyle(style);
                    System.out.println("首行出错，不应该有数字类型的数据");
                    break;
            }
        }
        return knowBaseInfo;
    }

    /**
     * 注册参数knowBaseInf
     *
     * @param knowBaseInfo
     * @param i
     * @param value
     */
    private void knowBaseInfoRegister(KnowBaseInfo knowBaseInfo, int i, String value) {
        switch (value.trim()) {
            case "学段":
                knowBaseInfo.setSection(i);
                break;
            case "科目":
                knowBaseInfo.setSubject(i);
                break;
            case "专题知识点序号":
                knowBaseInfo.setKnowledgeNumber(i);
                break;
            case "一级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                    knowBaseInfo.getNameColPostion().add( i );
                }
                break;
            case "二级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                    knowBaseInfo.getNameColPostion().add( i );
                }
                break;
            case "三级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                    knowBaseInfo.getNameColPostion().add( i );
                }
                break;
            case "四级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                    knowBaseInfo.getNameColPostion().add( i );
                }
                break;
            case "五级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                    knowBaseInfo.getNameColPostion().add( i );
                }
                break;
            case "六级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                    knowBaseInfo.getNameColPostion().add( i );
                }
                break;
            case "七级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                    knowBaseInfo.getNameColPostion().add( i );
                }
                break;
            case "八级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                    knowBaseInfo.getNameColPostion().add( i );
                }
                break;
            case "九级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                    knowBaseInfo.getNameColPostion().add( i );
                }
                break;
            case "十级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                    knowBaseInfo.getNameColPostion().add( i );
                }
                break;
        }
    }

            /**==================================================以上是专题知识点===================================================================*/
            /**====================================================华丽的分割线=====================================================================*/
            /**==================================================以下是同步知识点===================================================================*/
    private Boolean syncKnowledgeCheck(Sheet sheet) {

        return null;
    }


    public static void main(String[] args) {
        KnowBaseInfo knowBaseInfo = new KnowBaseInfo();
        knowBaseInfo.setSection(33);
        knowBaseInfo.setSubject(33);
        Boolean checkResult = true;
        initaa(knowBaseInfo, 2 ,checkResult);
        System.out.println( checkResult );

        System.out.println(knowBaseInfo.getSection().toString() + "  " + knowBaseInfo.getSubject());

        String filePath = "F:\\excel\\bbb.xlsx";

        String filePathPrefix = filePath.substring( 0,filePath.lastIndexOf(".") );
        String filePathSuffix = filePath.substring(filePath.lastIndexOf(".") );

        System.out.println( filePathPrefix +"----------> "+ filePathSuffix);

        String val = "<split-tag>1.1 集合";
        System.out.println( val.indexOf( "<split-tag>") > -1);
        System.out.println( val.replace( "<split-tag>" ,""));
    }

    private static void initaa(KnowBaseInfo knowBaseInfo, int a ,Boolean checkResult) {
        knowBaseInfo.setSection(72);
        knowBaseInfo.setSubject(22);
        System.out.println(a);
        checkResult = false;

    }

}
