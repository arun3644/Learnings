package com.hospital.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ExperienceResponse {

    @JsonProperty("yearsOfExperience")
    private List<Integer> yearsOfExperience;

    public ExperienceResponse(List<Integer> experience) {
        this.yearsOfExperience = experience;
    }

    public List<Integer> getYearsOfExperience() {  
        return yearsOfExperience;
    }

    public void setYearsOfExperience(List<Integer> yearsOfExperience) {  
        this.yearsOfExperience = yearsOfExperience;
    }

}
