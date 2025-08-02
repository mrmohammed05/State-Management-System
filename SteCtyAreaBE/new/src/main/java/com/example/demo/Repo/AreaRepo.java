package com.example.demo.Repo;

import com.example.demo.Entity.AreaMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AreaRepo extends JpaRepository<AreaMaster, Integer> {
    boolean existsByAreaname(String areaname);
}
