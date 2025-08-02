package com.example.demo.Repo;

import com.example.demo.Entity.CityMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepo extends JpaRepository<CityMaster,Integer> {
    boolean existsByCityname(String cityname);
}
