"use client";

import styles from "@/app/ui/elements/login/css/loginForm.module.css";
import { useState } from "react";

export default function LoginForm (): JSX.Element
{
  const [ selected, setSelected ] = useState( -1 );
  const [ visible, setVisible ] = useState( false );
  
  return (
    <div className={styles.loginBox}>
      {/* maybe TODO: add OAuth */}
      <div className={styles.withUsernameAndPassword}>
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <header className={styles.tabsHeader}>
              <button tabIndex={-1} onClick={() => setSelected( -1 )}
                      className={selected == -1 ? styles.tabSelected : styles.tab}>
                <span>Log In</span>
              </button>
              <button tabIndex={0} onClick={() => setSelected( 0 )}
                      className={selected == 0 ? styles.tabSelected : styles.tab}>
                <span>Sign Up</span>
              </button>
            </header>
          </div>
          <div className={styles.iDunno}>
            <div className={styles.iDunnoChild}></div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <form noValidate={true} className={styles.form}>
            <div className={styles.emailInputContainer}>
              <div>
                <label className={styles.inputLabel}>E-mail</label>
                <div className={styles.emailInputInnerContainer}>
                  <input name={"username"} type={"email"} className={styles.emailInput} />
                  <div className={styles.emailFailureIconContainer}></div>
                </div>
              </div>
            </div>
            <div className={styles.passwordInputContainer}>
              <div className={styles.passwordInputContainer2}>
                <div>
                  <label className={styles.inputLabel}>Password</label>
                  <div className={styles.passwordInputInnerContainer}>
                    <input name={"password"} type={visible ? "text" : "password"} className={styles.passwordInput} />
                    <div className={styles.passwordVisibleIconContainer}>
                      <div className={styles.passwordVisibleIconInnerContainer} onClick={() => setVisible( !visible )}>
                        {visible ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                               data-testid="eye-not" className={styles.passwordVisibleIcon}>
                            <path fill="currentColor" fillRule="evenodd"
                                  d="m3.498 2 3.984 3.985A11.008 11.008 0 0 1 12.042 5c4.747 0 8.75 2.953 10.042 7-.635 1.989-1.928 3.708-3.641 4.946l4.59 4.59v1.414H21.62L2.084 3.415V2h1.414zm1.406 5.637L6.327 9.06a7.797 7.797 0 0 0-2.197 2.939c1.249 2.974 4.408 5 7.912 5 .68 0 1.339-.097 1.982-.242l1.635 1.635a11.073 11.073 0 0 1-3.617.607C7.295 19 3.29 16.047 2 12c.54-1.692 1.559-3.19 2.904-4.363zM12.042 7c-1.051 0-2.06.203-3.004.54l1.742 1.743c.383-.18.81-.283 1.262-.283a3 3 0 0 1 3 3c0 .452-.103.879-.283 1.262l2.228 2.228c1.313-.866 2.367-2.06 2.967-3.49-1.25-2.974-4.408-5-7.912-5zm-2.98 4.796 3.183 3.183c-.068.005-.134.021-.204.021a3 3 0 0 1-3-3c0-.07.016-.136.021-.204z"></path>
                          </svg> ) : ( <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none"
                                            viewBox="0 0 24 24" data-testid="eye-yes"
                                            className={styles.passwordVisibleIcon}>
                          <path fill="currentColor" fillRule="evenodd"
                                d="M9.042 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm2 0c0 .551.449 1 1 1 .55 0 1-.449 1-1 0-.551-.45-1-1-1-.551 0-1 .449-1 1Z"
                                clipRule="evenodd"></path>
                          <path fill="currentColor" fillRule="evenodd"
                                d="M2 12c1.29-4.047 5.295-7 10.042-7s8.75 2.953 10.042 7c-1.291 4.047-5.295 7-10.042 7S3.29 16.047 2 12Zm2.13 0c1.249 2.974 4.408 5 7.912 5 3.504 0 6.663-2.026 7.912-5-1.25-2.974-4.408-5-7.912-5-3.504 0-6.663 2.026-7.912 5Z"
                                clipRule="evenodd"></path>
                        </svg> )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.error}></div>
            <button className={styles.forgorPassButton} type={"button"}>
              <span className={styles.forgorPassSpan}>
                <span>Forgot password?</span>
              </span>
            </button>
            <button className={styles.loginSubmitButton} type={"submit"}>
              <span className={styles.loginSubmitButtonSpan}>
                <span>Log In</span>
              </span>
            </button>
          </form>
          <p className={styles.funnyText}>
            Continuing through one of the providers indicated above<br />
            I accept the Terms and Conditions of the website<br />
            in its current form.
          </p>
        </div>
      </div>
    </div>
  );
}