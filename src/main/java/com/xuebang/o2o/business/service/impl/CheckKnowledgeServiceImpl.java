package com.xuebang.o2o.business.service.impl;

import com.xuebang.o2o.business.entity.KnowBaseInfo;
import com.xuebang.o2o.business.entity.Knowledge;
import com.xuebang.o2o.business.service.CheckKnowledgeService;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2016/11/9.
 */
public class CheckKnowledgeServiceImpl implements CheckKnowledgeService {
    /**
     * 专题知识点的list
     */
    private List<Knowledge> knowledges = new ArrayList<>();

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


        CellStyle style = wb.createCellStyle();
        style.setFillBackgroundColor(HSSFColor.RED.index);

        //读取所有的sheet页
        /** 规定第一个sheet页必须是专题知识点  */
        for (int i = 0; i < wb.getNumberOfSheets(); i++) {
            if (i == 0) {
                if (wb.getSheetAt(i).getSheetName().indexOf("专题") > 0) {
                    //专题知识点的处理
                    knowledgeCheck(wb.getSheetAt(i), style);
                }else {
                    throw new  RuntimeException("第一个sheet页不是专题知识点");
                }

            } else {
                //同步知识点的处理
                syncKnowledgeCheck(wb.getSheetAt(i));
            }


        }


        return null;
    }


    /**
     * 专题知识点的处理
     *
     * @param sheet
     */
    private void knowledgeCheck(Sheet sheet, CellStyle style) {
        KnowBaseInfo knowBaseInfo = initKnowBaseInfoParam(sheet, style);
        for (int i = 1; i < sheet.getLastRowNum() + 1; i++) {
            Row row = sheet.getRow( i );
            for ( int j = 0 ; j < (int) row.getLastCellNum() + 1 ; j ++){

            }
        }


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
                }
                break;
            case "二级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                }
                break;
            case "三级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                }
                break;
            case "四级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                }
                break;
            case "五级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                }
                break;
            case "六级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                }
                break;
            case "七级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                }
                break;
            case "八级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                }
                break;
            case "九级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                }
                break;
            case "十级专题知识点":
                if (knowBaseInfo.getName2position().containsKey(value.trim())) {
                    System.out.println(value.trim() + "---->存在多个");
                } else {
                    knowBaseInfo.getName2position().put(value.trim(), i);
                }
                break;
        }
    }


    private void syncKnowledgeCheck(Sheet sheet) {

    }


    public static void main(String[] args) {
        KnowBaseInfo knowBaseInfo = new KnowBaseInfo();
        knowBaseInfo.setSection(33);
        knowBaseInfo.setSubject(33);
        initaa(knowBaseInfo, 2);

        System.out.println(knowBaseInfo.getSection().toString() + "  " + knowBaseInfo.getSubject());
    }

    private static void initaa(KnowBaseInfo knowBaseInfo, int a) {
        knowBaseInfo.setSection(72);
        knowBaseInfo.setSubject(22);
        System.out.println(a);

    }

}
