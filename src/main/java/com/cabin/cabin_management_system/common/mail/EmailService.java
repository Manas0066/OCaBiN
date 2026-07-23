package com.cabin.cabin_management_system.common.mail;

import com.cabin.cabin_management_system.auth.entity.User;

public interface EmailService {

    void sendTemporaryPasswordMail(
            User user,
            String temporaryPassword
    );

}