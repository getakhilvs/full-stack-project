package com.bytes.intern.ERRS.service.serviceImpl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bytes.intern.ERRS.DAO.AchievementDao;
import com.bytes.intern.ERRS.DAO.EmployeeDao;
import com.bytes.intern.ERRS.DAO.TransactionDao;
import com.bytes.intern.ERRS.DTO.AchievementsDto;
import com.bytes.intern.ERRS.DTO.EmployeeDto;
import com.bytes.intern.ERRS.DTO.PointAllocationDto;
import com.bytes.intern.ERRS.model.Achievement;
import com.bytes.intern.ERRS.model.Employee;
import com.bytes.intern.ERRS.model.TransactionCredit;
import com.bytes.intern.ERRS.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    EmployeeDao employeeDao;

    @Autowired
    TransactionDao transactionDao;

    @Autowired
    AchievementDao achievementDao;

    @Override
    public Employee addEmployee(EmployeeDto employeeDto) {
        try {
            
            if (employeeDao.findByEmail(employeeDto.getEmail()) != null) {
                return null;
            }

            Employee employee = new Employee();
            employee.setEmployeeFirstName(employeeDto.getFirstName());
            employee.setEmployeeLastName(employeeDto.getLastName());
            employee.setEmail(employeeDto.getEmail());
            employee.setAge(employeeDto.getAge());
            employee.setEmployeePosition(employeeDto.getPosition());
            employee.setEmployeePassword(employeeDto.getPassword());
            employee.setEmployeeGender(employeeDto.getGender());
            employee.setEmployeeRole("employee");
            employee.setEmployeeTotalPoints((long) 0);
            employee.setEmployeeTotalDebitPoints(0);

           
            employeeDao.save(employee);
            return employee;
        } catch (DataAccessException e) {
            e.printStackTrace();
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public ResponseEntity<?> addReward(PointAllocationDto pointAllocationDto) {
        try {
            Long rewarId = pointAllocationDto.getRewardId();
            Achievement achievement = achievementDao.findById(rewarId).orElse(null);

            if (achievement == null) {
                return new ResponseEntity<>("Reward not found", HttpStatus.BAD_REQUEST);
            }

            Long points = achievement.getPoints();

            List<Long> allEmployeeId = pointAllocationDto.getEmployeeIdList();

            for (Long empId : allEmployeeId) {
                Employee employee = employeeDao.findById(empId).orElse(null);

                if (employee == null) {
                    return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
                }

                Long currentPoint = employee.getEmployeeTotalPoints();
                if (currentPoint == null) {
                    currentPoint = 0L;
                }

                employee.setEmployeeTotalPoints(currentPoint + points);
                TransactionCredit transactionCredit = new TransactionCredit();
                transactionCredit.setAward(achievement.getAchievement_name());
                transactionCredit.setEmployee(employee);
                transactionCredit.setRemarks(achievement.getAchievement_desc());
                transactionCredit.setNumberofPoints(points);
                Date currentDate = new Date();
                transactionCredit.setTransactionDateTime(currentDate);

                transactionDao.save(transactionCredit);

                employeeDao.save(employee);
            }

            return new ResponseEntity<>("Rewards added", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error adding rewards", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public List<Employee> getEmployeeList() {
        return employeeDao.findAll();
    }

    @Override
    public List<Employee> getBestEmployeeList() {
        return employeeDao.findAllByOrderByemployeeTotalPointsDesc();
    }

    @Override
    public Achievement addAchievement(AchievementsDto achievementDto) {
        try {
            Achievement achievement = new Achievement();
            achievement.setAchievement_name(achievementDto.getAchievement_name());
            achievement.setAchievement_desc(achievementDto.getAchievement_desc());
            achievement.setPoints(achievementDto.getPoints());
            return achievementDao.save(achievement);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

   

    @Override
    public List<Achievement> getAchievementList() {
        return achievementDao.findAll();
    }

	@Override
	public Employee getDetails(long employeeId) {
		return employeeDao.findById(employeeId).get();
	}
}
