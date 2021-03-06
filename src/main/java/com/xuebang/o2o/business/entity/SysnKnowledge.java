package com.xuebang.o2o.business.entity;

import com.xuebang.o2o.core.repository.entity.LongIdEntity;

import javax.persistence.*;

/**
 * Created by Administrator on 2016/7/26.
 */
@Entity
@Table(name = "sync_knowledge")
public class SysnKnowledge extends LongIdEntity{


    private String number;//本知识点的序号

    private String name;

    private String section;//学段

    private String subject;

    private SysnKnowledge parent;


    private String publishVersion;//教材版本

    private String bookVersion;//书本


    private String  knowName ; //专题知识点名字
    private String  knowNumber;//专题知识点序号


    private Knowledge knowledge;//专题知识点id

    private Integer sort;

    private Integer isLeaf;//是否叶子节点 0 不是  1是

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }


    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    @ManyToOne
    @JoinColumn
    public SysnKnowledge getParent() {
        return parent;
    }

    public void setParent(SysnKnowledge parent) {
        this.parent = parent;
    }


    public String getPublishVersion() {
        return publishVersion;
    }

    public void setPublishVersion(String publishVersion) {
        this.publishVersion = publishVersion;
    }

    public String getBookVersion() {
        return bookVersion;
    }

    public void setBookVersion(String bookVersion) {
        this.bookVersion = bookVersion;
    }

    public String getKnowName() {
        return knowName;
    }

    public void setKnowName(String knowName) {
        this.knowName = knowName;
    }

    public String getKnowNumber() {
        return knowNumber;
    }

    public void setKnowNumber(String knowNumber) {
        this.knowNumber = knowNumber;
    }



    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getIsLeaf() {
        return isLeaf;
    }

    public void setIsLeaf(Integer isLeaf) {
        this.isLeaf = isLeaf;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    @ManyToOne
    @JoinColumn
    public Knowledge getKnowledge() {
        return knowledge;
    }

    public void setKnowledge(Knowledge knowledge) {
        this.knowledge = knowledge;
    }
}
