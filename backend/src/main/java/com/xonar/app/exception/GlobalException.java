package com.xonar.app.exception;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import com.xonar.app.exception.status.ConflictException;
import com.xonar.app.exception.status.NotFoundException;
import com.xonar.app.exception.status.ServiceException;
import com.xonar.app.exception.status.TokenException;

@RestControllerAdvice
public class GlobalException {
    private ResponseEntity<ErrorResponse> response(HttpStatus status, String errorType, String message) {
        ErrorResponse err = new ErrorResponse(
            status.value(),
            errorType,
            message
        );

        return new ResponseEntity<>(err, status);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField().substring(0,1).toUpperCase() + error.getField().substring(1) + " " + error.getDefaultMessage())
            .collect(Collectors.joining(". "));

        return response(HttpStatus.BAD_REQUEST, "Input Failure", errors); // 400
    }
    
    @ExceptionHandler(TokenException.class)
    public ResponseEntity<ErrorResponse> authException(TokenException ex) {
        return response(HttpStatus.UNAUTHORIZED, "Unauthorized Access", ex.getMessage()); // 401
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> credentialsException(BadCredentialsException ex) {
        return response(HttpStatus.UNAUTHORIZED, "Authentication Failure", "Invalid email or password"); // 401
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> accessDeniedException(AccessDeniedException ex) {
        return response(HttpStatus.FORBIDDEN, "Ownership Mismatch", ex.getMessage()); // 403
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> notFoundException(NotFoundException ex) {
        return response(HttpStatus.NOT_FOUND, "Not Found", ex.getMessage()); // 404
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorResponse> conflictException(ConflictException ex) {
        return response(HttpStatus.CONFLICT, "Resource Conflicts", ex.getMessage()); // 409
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> sizeException(MaxUploadSizeExceededException ex) {
        return response(HttpStatus.PAYLOAD_TOO_LARGE, "Upload Size Exceeded", "File is too large! Maximum allowed: 15MB"); // 409
    }

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<ErrorResponse> serviceException(ServiceException ex) {
        return response(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", ex.getMessage()); // 500
    }
}