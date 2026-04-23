package com.demo.spring.services;

import com.demo.spring.entity.Emp;
import com.demo.spring.exceptions.EmpExistsException;
import com.demo.spring.exceptions.EmpExistsException;
import com.demo.spring.exceptions.EmpNotFoundException;
import com.demo.spring.repositories.EmpRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;
import java.util.Optional;

@Service
public class EmpService {
    private EmpRepository empRepository;

    public EmpService(EmpRepository empRepository){
        this.empRepository = empRepository;
    }

    public List<Emp> getALlEmps(){
        return this.empRepository.findAll();
    }
    public Emp getOneEmp(Integer id){
        Optional<Emp> empOP= empRepository.findById(id);
        if(empOP.isPresent()){
            return empOP.get();
        }else{
            throw new EmpNotFoundException("emp with id "+" "+ id+ " "+ "not found");
        }
    }
    public Emp save(Emp e){
        if(empRepository.existsById((e.getEmpId()))){
            throw new EmpExistsException(("emp is in db"));
        }else{
            return empRepository.save(e);
        }

    }
    public String delete(Integer id) {
        if(empRepository.existsById(id)) {
            empRepository.deleteById(id);
            return "employee deleted";
        } else {
            throw new RuntimeException("Emp Not found");
        }
    }

    public Emp update(Emp e) {
        if(empRepository.existsById(e.getEmpId())) {
            return empRepository.save(e);
        } else {
            throw new RuntimeException("Emp Not found");
        }
    }

    public Emp partialUpdate(Integer id,Emp partialEmp){

        Emp emptarget = empRepository.findById(id).orElseThrow(()-> new EmpNotFoundException("emp not found"));
        if (partialEmp.getName()!=null){
            emptarget.setEmpId(partialEmp.getEmpId());
        }
        if (partialEmp.getSalary()!=null){
            emptarget.setSalary(partialEmp.getSalary());
        }
        if (partialEmp.getCity()!=null){
            emptarget.setCity(partialEmp.getCity());
        }
        return empRepository.save(emptarget);

    }
}
