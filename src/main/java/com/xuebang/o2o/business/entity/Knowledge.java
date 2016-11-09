package com.xuebang.o2o.business.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Administrator on 2016/7/26.
 */
@Entity
public class Knowledge {

    @Id
    private Long id;

    private String name;

    private String section;//学段

    private String number;

    private String subject;

    private String parent;

    private Long parentId;

    private Integer sort;

    private Integer isLeaf; //是否叶子节点 0 不是  1是


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

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
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

    @Override
    public String toString() {
        return "Knowledge{" +
                "number='" + number + '\'' +
                ", parent='" + parent + '\'' +
                ", name='" + name + '\'' +
                '}';
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
