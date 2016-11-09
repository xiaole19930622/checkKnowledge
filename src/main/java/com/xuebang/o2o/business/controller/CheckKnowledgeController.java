package com.xuebang.o2o.business.controller;

import com.xuebang.o2o.business.service.CheckKnowledgeService;

import java.io.IOException;

/**
 * 检测知识点
 * Created by xiaole on 2016/11/9.
 */
public class CheckKnowledgeController {

    private CheckKnowledgeService checkKnowledgeService;

    public String checkKnow( String filePath ) throws IOException {
        String result =  checkKnowledgeService.check(filePath);
        return result;
    }

}
