package com.xonar.app.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthEntity {
    @Id @Setter(AccessLevel.NONE) private String id;
    @NotBlank @Indexed(unique = true) private String email;
    /* "Coding is fun", they said

    From 11AM to 3 AM, I sat infront of the computer screen, 
    staring at "Unexpected End of JSON Input" error hopelessly.

    All I did was renaming from "username" to "email", everything went out of hand.
    Ctrl + Z didnt help.

    By declaring @Indexed(unique = true) to username, my "users" collection
    still contained a unique index on "username" (former field). So MongoDB kept 
    enforcing [username must be unique], even though my code no longer used it.

    I thought that was frontend failure, I hardcoded, explicitly set value for
    input fields. My register.ts was a dumpster fire, filled with nothing but
    console.log() and conditional statements, spamming if else til I crashed out.

    Nonetheless, nothing worked out. Later on, I tried to fill every line of my
    backend with println(). THEY DIDN'T EVEN EXECUTE, in other words, println()
    was NEVER reached. I thought I was done for.

    Then something came up in my terminal, among the mess of the output:
    "index: username dup key: { username: null }". I knew exactly what was going
    on, MongoDB was freaking out as I sent a value that was never specified
    to MongoDB (email). The problem was fixed by dropping the whole "users" collection,
    effectively allowing MongoDB to perform a factory reset for that collection

    => Moral of the story: Lesson learned the hard way, always check the output of spring boot 
    in terminal.

    */
    @NotBlank private String password;
    private String refreshToken; 
    @Builder.Default private String role = "USER";
}
