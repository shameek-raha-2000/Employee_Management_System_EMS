package com.example.EMSbackend.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.EMSbackend.Model.EMSModel;

@Repository
public interface EMSRepository extends JpaRepository<EMSModel, Long> {
	
//ALL FILTERS SECTION 
//IF I WANT TO QUERY ALL THE DATA FIELDS IN ONE GO, 
//THEN I HAVE TO INPUT ALL THE FILTERS DATA FIELD TOGETHER AND IF NOT HAVE TO PROVIDE NULL CHECKER 
//Note - "AND" means check both || "OR" means anyone
	
	@Query( value = "SELECT * FROM EMPLOYEE_DETAILS s WHERE "
			+ "(:rid IS NULL OR s.rid = :rid) AND "
		    + "(:name IS NULL OR s.name = :name) AND "
		    + "(:poy IS NULL OR s.poy = :poy) AND "
		    + "(:streamName IS NULL OR s.streamName = :streamName) AND "
		    + "(:status IS NULL OR s.status = :status)",nativeQuery = true)
	  
	List<EMSModel> filterEmployeeDetailsGroupData(
			@Param("rid") Integer rid,
		    @Param("name") String name,
		    @Param("poy") LocalDate poy,
		    @Param("streamName") String streamName,
		    @Param("status") String status
		    );
	

}
