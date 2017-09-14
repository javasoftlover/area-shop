package com.area.shop.framework;

import com.area.shop.utils.BitUtils;

import javax.persistence.AttributeConverter;
import java.util.BitSet;

/**
 * 自定义BitSet 转化器
 */
public class BitSetConvert implements AttributeConverter<BitSet, byte[]> {

    @Override
    public byte[] convertToDatabaseColumn(BitSet attribute) {
        return BitUtils.bitSet2ByteArray(attribute);
    }

    @Override
    public BitSet convertToEntityAttribute(byte[] dbData) {
        return BitUtils.byteArray2BitSet(dbData);
    }


}
