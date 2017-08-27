package com.area.shop.repository;

import com.area.shop.domain.Demo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

/**
 * demo
 */
@Repository
public interface DemoRep extends PagingAndSortingRepository<Demo, Long> {

}
