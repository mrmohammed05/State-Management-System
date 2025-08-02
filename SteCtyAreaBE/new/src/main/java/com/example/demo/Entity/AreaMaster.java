package com.example.demo.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AreaMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int areaid;
    private String areaname;

    //raltional mapping for citymaster
    @ManyToOne
    @JoinColumn(name = "cityid")
    private CityMaster citymaster;

    public int getAreaid() {
        return areaid;
    }

    public void setAreaid(int areaid) {
        this.areaid = areaid;
    }

    public String getAreaname() {
        return areaname;
    }

    public void setAreaname(String areaname) {
        this.areaname = areaname;
    }

    public CityMaster getCitymaster() {
        return citymaster;
    }

    public void setCitymaster(CityMaster citymaster) {
        this.citymaster = citymaster;
    }


}
