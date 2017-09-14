package com.area.shop.utils;

import net.sf.json.JSONObject;

import java.util.Arrays;
import java.util.BitSet;

/**
 * bit 操作类
 */
public class BitUtils {

    public static byte[] bitSet2ByteArray(BitSet bitSet) {

        if(bitSet == null || bitSet.length() <= 0){
            return null;
        }

        byte[] bytes = new byte[bitSet.size() / 8];
        for (int i = 0; i < bitSet.size(); i++) {
            int index = i / 8;
            int offset = 7 - i % 8;
            bytes[index] |= (bitSet.get(i) ? 1 : 0) << offset;
        }
        return bytes;
    }

    public static BitSet byteArray2BitSet(byte[] bytes) {

        if(bytes == null){
            return null;
        }

        BitSet bitSet = new BitSet(bytes.length * 8);
        int index = 0;
        for (int i = 0; i < bytes.length; i++) {
            for (int j = 7; j >= 0; j--) {
                bitSet.set(index++, (bytes[i] & (1 << j)) >> j == 1 ? true : false);
            }
        }
        return bitSet;
    }

    public static void main(String[] args) {

        BitSet bitSet = new BitSet(30);
        bitSet.set(0);
        bitSet.set(1, true);
        bitSet.set(3, true);

        System.out.println(bitSet.toString());

        for(int i=0; i<bitSet.length(); i++){
            System.out.println(i+"-->"+bitSet.get(i));
        }

        //将BitSet对象转成byte数组
        byte[] bytes = bitSet2ByteArray(bitSet);
        System.out.println(Arrays.toString(bytes));

        //在将byte数组转回来
        bitSet = byteArray2BitSet(bytes);
        System.out.println(bitSet.get(0));
        System.out.println(bitSet.get(2));
    }

}
