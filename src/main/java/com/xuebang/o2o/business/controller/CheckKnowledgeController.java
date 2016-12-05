package com.xuebang.o2o.business.controller;

import com.xuebang.o2o.business.service.CheckKnowledgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.awt.print.Book;
import java.io.IOException;

/**
 * 检测知识点
 * Created by xiaole on 2016/11/9.
 */
@Controller
@RequestMapping("checkKnow")
public class CheckKnowledgeController {

    @Autowired
    private CheckKnowledgeService checkKnowledgeService;

    @RequestMapping("checkKnow")
    @ResponseBody
    public String checkKnow( String filePath ) throws IOException {
        boolean result =  checkKnowledgeService.check(filePath);
        if( result){
            return  "知识点正确，可以导入";
        }else {
            return "知识点有误，请检查对应的错误excel";
        }

    }

}
