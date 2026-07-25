package com.hospital.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SpecializationResponse {

    @JsonProperty("specialization")
    private List<String> specialization;

    public SpecializationResponse(List<String> specialization) {
        this.specialization = specialization;
    }

    public List<String> getSpecialization() {
        return specialization;
    }

    public void setSpecialization(List<String> specialization) {
        this.specialization = specialization;
    }
}
