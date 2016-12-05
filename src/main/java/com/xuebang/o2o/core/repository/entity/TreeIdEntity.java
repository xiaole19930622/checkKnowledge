package com.xuebang.o2o.core.repository.entity;

import com.xuebang.o2o.core.vo.ITreeNode;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

/**
 * 树型实体
 * Created by xuwen on 2015/4/23.
 */
@MappedSuperclass
public abstract class TreeIdEntity<T extends TreeIdEntity> implements Serializable,ITreeNode<T> {

    protected Integer id; // 树型ID

    @Id
    @GenericGenerator(name = "generator", strategy = "com.xuebang.o2o.core.repository.strategy.TreeIdGenerator")
    @GeneratedValue(generator = "generator")

    @Override
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
