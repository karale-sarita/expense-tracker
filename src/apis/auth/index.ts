

export async function initate_google_login() {
    await window.open('http://localhost:8080/auth/initiate_google_login','_self')
}