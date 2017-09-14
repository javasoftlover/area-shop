package com.area.shop.domain;

import com.area.shop.framework.BitSetConvert;

import javax.persistence.Convert;
import javax.persistence.Entity;
import java.util.BitSet;

/**
 * demo
 */
@Entity
public class Demo extends Base {

    private String name;

    private Integer age;

    @Convert(converter = BitSetConvert.class)
    private BitSet sign;

    public BitSet getSign() {
        return sign;
    }

    public void setSign(BitSet sign) {
        this.sign = sign;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
