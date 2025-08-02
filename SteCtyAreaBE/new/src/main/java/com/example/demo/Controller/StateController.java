package com.example.demo.Controller;


import com.example.demo.Entity.StateMaster;

import com.example.demo.Repo.StateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
public class StateController {

    @Autowired
    private StateRepo staterepo;


    @PostMapping("/AddState")
    public ResponseEntity<?> addstate(@RequestBody StateMaster obj){
        if(staterepo.existsByStatename(obj.getStatename())){
            return new ResponseEntity<>("state name already added", HttpStatus.OK);
        }
        else {
            staterepo.save(obj);
            return new ResponseEntity<>("State added successfully",HttpStatus.OK);
        }
    }
    @GetMapping("/GetState")
    public ResponseEntity<?> getstate(){
        var statelst=staterepo.findAll();
        return new ResponseEntity<>(statelst,HttpStatus.OK);
    }

    @PutMapping("/Update")
    public ResponseEntity<?> update(@RequestBody StateMaster obj){
        var stateM=staterepo.findById(obj.getStateid()).orElseThrow(()->
                new RuntimeException("state not found"));
        stateM.setStateid((obj.getStateid()));
        stateM.setStatename(obj.getStatename());
        staterepo.save(stateM);
        return new ResponseEntity<>("state updated successfully",HttpStatus.OK);
    }
//    @PutMapping("/Update")
//    public ResponseEntity<?> update(@RequestBody StateMaster obj){
//        Optional<StateMaster>s=staterepo.findById(obj.getStateid());
//        if(s.isPresent()){
//            StateMaster s1= s.get();
//            obj.setStateid(obj.getStateid());
//            staterepo.save(obj);
//            return new ResponseEntity<>("state added successfully",HttpStatus.OK);
//        }
//        else {
//            return new ResponseEntity<>("id not found to update", HttpStatus.OK);
//        }
//    }

//    @DeleteMapping("/Delete/{id}")
//    public ResponseEntity<?> delete(@PathVariable Integer id){
//        var stateD=staterepo.findById(id).orElseThrow(()->
//                new RuntimeException("State not found"));
//        staterepo.delete(stateD);
//        return new ResponseEntity<>("State deleted successfully",HttpStatus.OK);
//    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        Optional<StateMaster> s=staterepo.findById(id);
        if(s.isPresent()){
            StateMaster s1=s.get();
            s1.setStateid(s1.getStateid());
            staterepo.delete(s1);
            return new ResponseEntity<>("delete successfully",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("id not found to delete state", HttpStatus.OK);

        }
    }
}
