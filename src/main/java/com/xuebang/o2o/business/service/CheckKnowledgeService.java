package com.xuebang.o2o.business.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

/**
 * Created by Administrator on 2016/11/9.
 */
@Service
@Transactional
public interface CheckKnowledgeService {


    public String check(String filePath) throws IOException;
}
