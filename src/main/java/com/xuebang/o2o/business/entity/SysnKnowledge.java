package com.xuebang.o2o.business.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Administrator on 2016/7/26.
 */
@Entity
@Table(name = "sync_knowledge")
public class SysnKnowledge {

    @Id
    private Long id;

    private String name;

    private String section;//学段

    private String subject;

    private String parent;

    private Long parentId;

    private String publishVersion;//教材版本

    private String bookVersion;//书本


    private String  knowName ; //专题知识点名字
    private String  knowNumber;//专题知识点序号


    private Long knowId;//专题知识点id

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

    public String getParent() {
        return parent;
    }

    public void setParent(String parent) {
        this.parent = parent;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getKnowId() {
        return knowId;
    }

    public void setKnowId(Long knowId) {
        this.knowId = knowId;
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
}
