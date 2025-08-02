package com.example.demo.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

public class CityMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int cityid;
    public String cityname;

//relational mapping for statemaster
    @ManyToOne
    @JoinColumn(name = "stateid")
    private StateMaster statemaster;

//relational mapping for Areamaster
    @OneToMany(mappedBy = "citymaster")
    @JsonIgnore
    private List<AreaMaster>areamaster;

    //setter and getter
    public int getCityid() {
        return cityid;
    }

    public void setCityid(int cityid) {
        this.cityid = cityid;
    }

    public String getCityname() {
        return cityname;
    }

    public void setCityname(String cityname) {
        this.cityname = cityname;
    }

    public StateMaster getStatemaster() {
        return statemaster;
    }

    public void setStatemaster(StateMaster statemaster) {
        this.statemaster = statemaster;
    }

    public List<AreaMaster> getAreamaster() {
        return areamaster;
    }

    public void setAreamaster(List<AreaMaster> areamaster) {
        this.areamaster = areamaster;
    }

}
