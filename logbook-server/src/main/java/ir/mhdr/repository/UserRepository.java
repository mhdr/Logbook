package ir.mhdr.repository;

import ir.mhdr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;

import java.util.List;


public interface UserRepository extends JpaRepository<User,Long> {
}
