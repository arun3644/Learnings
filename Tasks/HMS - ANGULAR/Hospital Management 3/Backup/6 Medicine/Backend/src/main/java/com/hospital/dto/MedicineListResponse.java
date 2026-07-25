package com.hospital.dto;

import java.util.List;

import com.hospital.dto.MedicineResponse.MedicineData;

public class MedicineListResponse {
    private boolean success;
    private String message;
    private List<MedicineData> data;

    public MedicineListResponse(boolean success, String message, List<MedicineData> data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public MedicineListResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<MedicineData> getData() {
        return data;
    }

    public void setData(List<MedicineData> data) {
        this.data = data;
    }
}
