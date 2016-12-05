package com.xuebang.o2o.business.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xuebang.o2o.core.repository.entity.LongIdEntity;
import com.xuebang.o2o.core.repository.entity.TreeIdEntity;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Administrator on 2016/7/26.
 */
@Entity
public class Knowledge extends TreeIdEntity<Knowledge>{

    private String name;

    private String section;//学段

    private String number;

    private String subject;

    private Knowledge parent;

    private List<Knowledge> children;

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

    @ManyToOne
    @JoinColumn
    public Knowledge getParent() {
        return parent;
    }


    @JsonIgnore
    @OneToMany(mappedBy = "parent")
    public List<Knowledge> getChildren() {
        return children;
    }

    public void setParent(Knowledge parent) {
        this.parent = parent;
    }

    @Override
    public String toString() {
        return "Knowledge{" +
                "name='" + name + '\'' +
                ", section='" + section + '\'' +
                ", number='" + number + '\'' +
                ", subject='" + subject + '\'' +
                ", parent=" + parent +
                ", children=" + children +
                ", sort=" + sort +
                ", isLeaf=" + isLeaf +
                '}';
    }

    public int getSort() {
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

    public void setChildren(List<Knowledge> children) {
        this.children = children;
    }
}
