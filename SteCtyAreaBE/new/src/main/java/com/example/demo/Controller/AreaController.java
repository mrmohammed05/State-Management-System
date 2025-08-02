package com.example.demo.Controller;


import com.example.demo.Entity.AreaMaster;
import com.example.demo.Entity.StateMaster;
import com.example.demo.Repo.AreaRepo;
import com.example.demo.Repo.CityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
public class AreaController {

    @Autowired
    private AreaRepo arearepo;

    @Autowired
    private CityRepo cityrepo;


    @PostMapping("/addarea/{id}")
    public ResponseEntity<?>addarea(@PathVariable Integer id, @RequestBody AreaMaster obj){
        if(arearepo.existsByAreaname(obj.getAreaname())){
            return new ResponseEntity<>("Area added already", HttpStatus.OK);
        }
        else {
            var citylst=cityrepo.findById(id).orElseThrow(()->new RuntimeException("Area id not found"));
            obj.setCitymaster(citylst);
            arearepo.save(obj);
            return new ResponseEntity<>("Area Added successfully",HttpStatus.OK);
        }
    }

    @GetMapping("/GetArea")
    public ResponseEntity<?> getarea(){
        var arealst=arearepo.findAll();
        return new ResponseEntity<>(arealst,HttpStatus.OK);
    }

    @PutMapping("/UpdateA")
    public ResponseEntity<?> update(@RequestBody AreaMaster obj){
        Optional<AreaMaster>A=arearepo.findById(obj.getAreaid());
        if(A.isPresent()){
            AreaMaster A1= A.get();
            obj.setAreaid(obj.getAreaid());
            arearepo.save(obj);
            return new ResponseEntity<>("area added successfully",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("id not found to update", HttpStatus.OK);
        }
    }

    @DeleteMapping("/DeleteA/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        var areaD=arearepo.findById(id).orElseThrow(()->
                new RuntimeException("State not found"));
        arearepo.delete(areaD);
        return new ResponseEntity<>("State deleted successfully",HttpStatus.OK);
    }



}
