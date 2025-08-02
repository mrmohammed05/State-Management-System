package com.example.demo.Repo;

import com.example.demo.Entity.StateMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StateRepo extends JpaRepository<StateMaster ,Integer> {
    boolean existsByStatename(String statename);
}
