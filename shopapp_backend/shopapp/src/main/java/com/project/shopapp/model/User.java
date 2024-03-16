package com.project.shopapp.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;


@Entity
@Table(name="users")
@Data//toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User extends BaseEntity implements UserDetails { // Implement từ UserDetails để tham chiếu User đến UserDetails
                                                            //Bởi vì Spring Security sẽ sử dụng UserDetails để chứa toàn
                                                            // bộ thông tin người dùng.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fullname", length = 100)
    private String fullName;

    @Column(name = "phone_number", length = 10, nullable = false)
    private String phoneNumber;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Column(name = "is_active")
    private boolean active;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "facebook_account_id")
    private int facebookAccountId;

    @Column(name = "google_account_id")
    private int googleAccountId;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    // Phương thức này lấy ra tất cả các role theo dạng: ROLE_ADMIN, ROLE_EMPLOYEE.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Trong một ứng dụng sử dụng Spring Security, quy tắc chung là vai trò (role) của người dùng được định nghĩa trong một chuỗi có dạng "ROLE_rolename".
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("ROLE_"+getRole().getName().toUpperCase()));
        return authorityList;
    }

    // trả về username cho user với username ở đây là phone_name
    @Override
    public String getUsername() {
        return phoneNumber;
    }

    // Phương thức kiểm tra tài khoản có hết hạn sử dụng hay không.
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    //Kiểm tra xem tài khoản của người dùng đang bị khóa hay không (false-> đang bị khóa)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // kiểm tra xem mật khẩu của người dùng có hết hạn hay không.
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // Kiểm tra xem tài khoản của người dùng có được kích hoạt hay không
    @Override
    public boolean isEnabled() {
        return true;
    }
}
