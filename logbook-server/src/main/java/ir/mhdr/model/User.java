package ir.mhdr.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "users")
public class User implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Column(nullable = false)
    public String userName;

    @Column(nullable = false)
    public String password;

    @Column(nullable = false)
    public String firstName;

    @Column(nullable = false)
    public String lastName;
}
