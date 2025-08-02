package com.example.demo.Controller;


import com.example.demo.Entity.CityMaster;
import com.example.demo.Entity.StateMaster;
import com.example.demo.Repo.CityRepo;
import com.example.demo.Repo.StateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@CrossOrigin("*")
public class CityController
{
    @Autowired
    private CityRepo cityrepo;

    @Autowired
    private StateRepo staterepo;


    @PostMapping("/Addcity/{id}")
    public ResponseEntity<?> addcity(@PathVariable Integer id, @RequestBody CityMaster obj){
        if(cityrepo.existsByCityname(obj.getCityname())){
            return new ResponseEntity<>("city name already added", HttpStatus.ALREADY_REPORTED);
        }
        else {
            var statelst=staterepo.findById(id).orElseThrow(()->
                    new RuntimeException("state id not found"));
            obj.setStatemaster(statelst);
            cityrepo.save(obj);
            return new ResponseEntity<>("city name added successfully",HttpStatus.OK);
        }

    }

@GetMapping("/GetCity")
    public ResponseEntity<?> getcity(){
        var citylist=cityrepo.findAll();
        return new ResponseEntity<>(citylist,HttpStatus.OK);
    }



    @PutMapping("/UpdateC")
    public ResponseEntity<?> update(@RequestBody CityMaster obj){
        var cityC=cityrepo.findById(obj.getCityid()).orElseThrow(()->
                new RuntimeException("state not found"));
        cityC.setCityid((obj.getCityid()));
        cityC.setCityname(obj.getCityname());
        cityrepo.save(cityC);
        return new ResponseEntity<>("state updated successfully",HttpStatus.OK);
    }


    @DeleteMapping("/Deletec/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        Optional<CityMaster> c=cityrepo.findById(id);
        if(c.isPresent()){
            CityMaster c1=c.get();
            c1.setCityid(c1.getCityid());
            cityrepo.delete(c1);
            return new ResponseEntity<>("delete successfully",HttpStatus.OK);
        }
//       else {
//            return new ResponseEntity<>("id not found", HttpStatus.OK);
//        }

        else {
            return new ResponseEntity<>("id not found to delte city", HttpStatus.BAD_REQUEST);
        }
    }
}
