package com.gradation.zmnnoory.domain.member.handler;

import com.gradation.zmnnoory.domain.member.dto.SignUpRequest;
import com.gradation.zmnnoory.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberCreateHandler {

    private final PasswordEncoder passwordEncoder;

    public Member createMemberWith(SignUpRequest signUpRequest) {
        return Member.builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .gender(signUpRequest.getGender())
                .build();
    }
}
