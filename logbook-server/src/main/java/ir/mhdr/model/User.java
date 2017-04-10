package ir.mhdr.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "users")
public class User implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false,name = "userName")
    private String userName;

    @Column(name = "password",nullable = false)
    private String password;

    @Column(name = "firstName",nullable = false)
    private String firstName;

    @Column(name = "lastName",nullable = false)
    private String lastName;
}
