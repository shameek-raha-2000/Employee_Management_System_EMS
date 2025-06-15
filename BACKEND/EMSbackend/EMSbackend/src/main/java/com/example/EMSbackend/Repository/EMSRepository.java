package com.example.EMSbackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.EMSbackend.Model.EMSModel;

@Repository
public interface EMSRepository extends JpaRepository<EMSModel, Long> {

}
