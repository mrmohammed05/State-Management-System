package com.example.demo.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.service.annotation.GetExchange;

import java.util.List;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class StateMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int stateid;
    public String statename;

    @OneToMany(mappedBy = "statemaster")
    @JsonIgnore
    private List<CityMaster> citymaster;

    public int getStateid() {
        return stateid;
    }

    public void setStateid(int stateid) {
        this.stateid = stateid;
    }

    public String getStatename() {
        return statename;
    }

    public void setStatename(String statename) {
        this.statename = statename;
    }

    public List<CityMaster> getCitymaster() {
        return citymaster;
    }

    public void setCitymaster(List<CityMaster> citymaster) {
        this.citymaster = citymaster;
    }
}
