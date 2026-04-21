---
title: java基础篇_集合
tags:
    - java
    - 集合
categories:
    - Java
description: 介绍了java集合相关的一些基础知识
date: 2026-4-21T18:00:00+08:00
updated: 2026-4-21T18:00:00+08:00
# 文章的永久链接
abbrlink: abc107
---

# **Java集合**

## *1.数组和集合的区别*
- （1.）集合长度可变，数组长度不可变。
- （2.）集合只能存储引用数据类型，且支持泛型；数组可以存储引用数据类型和基本数据类型，但是不支持泛型。
- （3.）集合的功能丰富，包括了增删改查、排序等各种操作；数组的功能较少，仅支持取值、赋值、求长度。
## *2.Java中集合的分类*
- Java中的集合大体上可以分为两类，分别是Map双列集合和Collection单列集合，其中Collection集合又包括了List集合、Set集合以及Queue集合。

    - (1.)List集合：
        ArrayList（动态数组，查询快、增删慢），LinkedList(双向链表，查询慢、增删快)，Vector(线程安全的集合)，List.of()(不可变集合)。
    - (2.)Set集合：
        HashSet(无序且不重复的集合)，LinkedHashSet(按照插入顺序排序的Set)，TreeSet(按照自然顺序排序，底层是红黑树)，Set.of()(不可变Set)。
    - (3.)Map集合：
        HashMap(无序哈希表)，LinkedHashMap(按照插入顺序排序的哈希表)，TreeMap(根据Key按照自然顺序排序，底层是红黑树)，不可变Map。
## *3.Java中有哪些并发安全的集合*
- （1.）Vector:线程安全的动态数组，内部方法使用synchronized关键字修饰。
- （2.）HashTable:线程安全的哈希表，内存方法使用synchronized关键字修饰。
- （3.）ConcurrentHashMap:线程安全的哈希表，JDK1.7之前使用分段锁实现线程同步，JDK1.8之后采用CAS+synchronized的方式加锁。
- （4.）CopyOnWriteArrayList：线程安全的动态数组，在进行新增操作时会加lock锁，然后在内部创建新的数组（大小比以前大1个元素）并复制原数组，最后再写入新的元素。
- （5.）还有其它一些并发的set、queue...
## *4.Collection和Collections的区别*
- Collection是Java中集合类的基础接口，它定义了一些集合的通用操作，比如说新增、删除等等。
- Collections是Java中对集合进行操作的工具类，它提供了包括排序、查找、替换在内的各种工具方法。
## *5.List集合的遍历方式*
- （1.）普通for循环，然后调用get(index)方法获取
- （2.）增强for循环直接获取element
- （3.）使用迭代器iterator:
```java
        Iterator<Integer> it = list.iterator();
        while(it.hasNext()){
            Integer num = it.next();
            ...;
        }
```
## *6.Map的遍历方式*
- （1.）使用for-each循环进行遍历：首先通过Map.Entry<keyType,valueType>类型的变量接收map.entrySet()集合中的对象，然后entry变量使用getKey()或者getValue()获取键值对。
```java
    for(Map.Entry<Integer> entry : map.entrySet()){
        System.out.println(entry.getKey()+","+entry.getValue());
    }
```
- （2.）使用迭代器：通过map.entrySet().iterator()方法获取迭代器，然后遍历迭代器，并使用Map.Entry<>接收元素，然后使用getKey()或者getValue()获取键值对。
```java
    Iterator<Map.Entry<Integer,String>> it = map.entrySet().iterator();
    while(it.hasNext()){
        Map.Entry<Integer,String> entry = it.next();
        System.out.println(entry.getKey()+","+entry.getValue());
    }
```
## *7.HashMap和HashTable的区别*
- （1.）HashMap线程不安全，HashTable线程安全。（原因在于HashTable内的大多数方法都加了synchronized关键字修饰）
- （2.）HashMap允许key、value为null，HashTable不允许
- （3.）二者的扩容机制不同

        - HashMap：
            - 初始容量是16，扩容时新的容量是原来的两倍
        - HashTable:
            - 初始容量是11，扩容时新的容量是原来的2倍+1
## *8.HashMap扩容时容量为什么是原来的两倍*
- （1.）HashMap底层的hash逻辑是通过hash值与容量长度减一的位运算（hash & (length - 1)）来截取hash值的低位而非模运算，只有当长度为2的幂次方时，长度减一才能保证二进制低位全是1，这样的哈希操作能够让CPU执行效率更高且哈希分布更均匀。
    - > 并不是直接拿key的hashcode进行位运算，而是会经过一次hash扰动：hash()，hash扰动的作用是把高位信息混合到低位，减少高位不同低位同的情况产生的哈希冲突。
- （2.）在进行数据迁移时，新的下标只有“不变和原下标+原容量”两种可能，数据迁移效率极高。
    - > 因为扩容后会多出一位高位，在重新进行hash时如果高位为0，那么下标就不变，如果高位为1，下标就新增原来的长度即可。
- （3.）能够均匀拆分原表中的桶内链表，有效减少哈希冲突，提升整体存取性能。
    - > 因为扰动后的hash值从概率上来说每一位的0/1概率相同，因此重新进行哈希时两种迁移状态的可能性是相同的，因此是均分。
## *9.ArrayList和Vector的区别*
- （1.）ArrayList线程不安全但是性能较好，Vector是线程安全但是性能差。
- （2.）ArrayList无参构造器初始化为空数组，首次添加元素后扩容为10；Vector无参构造器初始化数组容量为10。
- （3.）ArrayList扩容为原来的1.5倍，Vector扩容容量为原容量加增量。
## *10.将ArrayList变为线程安全的方法*
- （1.）使用Collections的synchronizedList()方法
- （2.）使用Vector或者CopyOnWriteArrayList替换ArrayList
## *11.ArrayList的扩容机制*

        - （1.）计算新数组的容量并创建新的数组
        - （2.）复制原来的元素到新数组中
        - （3.）修改索引指向新的数组
## *12.CopyOnWriteArrayList线程安全的原理*
- （1.）为底层数组添加volatile关键字保证可见性和有序性
- （2.）对写操作添加ReentrenLock可重入锁
    - > 在新增元素时会加锁，具体过程是先创建一个新的数组，大小比以前的数组大一个元素，然后把原来的数据和新增数据放入新的数组，最后修改索引指向新的数组。
## *13.HashMap的底层实现原理*
- （1.）JDK1.7之前，HashMap的底层是数组+链表的形式，对key进行哈希得到对应的槽，如果不同的key映射到相同的槽那么就会使用链表连接在一起。
- （2.）JDK1.8之后，HashMap的底层是数组+链表+红黑树，现在的hashmap在JDK1.7之前的版本上新增了一个机制，就是当哈希槽中的元素大于等于8个且哈希表中总的元素大于等于64个的时候会将链表转换为红黑树。如果后续容量小于6则又会转回链表。
- （3.）为什么是8：

        - 因为红黑树虽然查询快，但是更占内存且创建成本更高。短链表转红黑树会浪费资源，所以不能太早转。
        - 同时根据HashMap的原码注释，在正常哈希数据下，链表长度达到8的概率是亿分之6，这是一个正常情况达不到的阈值，只有真正发生严重的哈希冲突时，才会使用红黑树来兜底。
- （4.）为什么要同时满足大于等于64：

        - 原因在当数组中的元素小于64个时可能不是哈希算法差，而是数组太小导致的扎堆，因此优先选择扩容来打散冲突让链表变短，比转树更简单高效且节省内存。
## *14.HashMap的扩容原理*
- （1.）扩容原理：HashMap的负载因子默认是0.75，这就意味着当HashMap中的元素数量超过了总容量的75%的时候会触发扩容机制。
- （2.）扩容机制：

        - 首先计算新哈希表的大小（大小为原表的两倍），并创建新的哈希表
        - 然后通过rehash进行数据迁移
        - 最后修改索引指向新的哈希表完成扩容
## *15."==" 与 "equals" 的区别*
- （1.）对于基本数据类型，二者比较的都是值的大小
- （2.）对于引用类型的数据，"=="比较的是引用本身的值，"equals"比较的是引用指向的内容，但是equals方法需要我们自己去重写实现，否则默认也是比较的引用值。
## *16.hashCode的作用*
- hashCode()方法的作用是为对象生成一个hash值

        - 这个hash值可以用于对象的查找，比如说哈希表中对象的查找
        - 也可以用于快速去重，比如说hashSet就会根据hashCode值来判断是否重复的
## *17.hashCode和equals的关系*
- （1.）两个对象equals相等，那么他们的hashCode一定相等
- （2.）两个对象hashCode相等，他们equals不一定相等，可能发生哈希冲突
- （3.）可以推出：两个对象hashCode不等，那么这两个对象一定不等
- （4.）必须保证hashCode与equals方法的统一，否则会导致不同key的hashCode、equals结构一致，导致数据被覆盖。
## *18.hashMap的put过程*

        - （1.）首先hashMap通过对key进行hash得到对应槽的位置
        - （2.）然后看这个槽是否为空，如果为空那么就创建entry插入槽中
        - （3.）如果不为空那么就遍历槽中的链表或者红黑树，对比是否存在相同的key，如果存在那么就覆盖对应的value
        - （4.）如果遍历后都找不到相同的key，那么就会在链表末尾或者红黑树末尾插入一个新的entry。
        - （5.）在插入新的entry之前，hashMap会检查是否需要扩容或者转成红黑树。
