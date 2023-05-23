export function validarcedula(cedula: string) {

    //const cedula_=parseInt(cedula_input);
    if (cedula.length == 10) {
      var total = 0;
      var par = 0;
      var impar = 0;
      var verify;
      var digito = cedula.charAt(9);
      
  
      for ( let i = 0; i < cedula.length - 1; i++) {
        if (i % 2 == 0) {
          par = 2 * parseInt(cedula.charAt(i));
          if (par >= 10) {
            par -= 9;
          }
          total += par;
        } else {
          total += parseInt(cedula.charAt(i));
        }
      }
      if (total % 10 != 0) {
        verify = 10 - (total % 10);
      } else {
        verify = 0;
      }
      if (verify == parseInt(digito) ) return true;
      else return false;
    } else return false;
  }
  
  export function validarRUC(ruc: string) {
    var coefJuridic = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    var coefPublic = [3, 2, 7, 6, 5, 4, 3, 2];
    var total = 0;
    var type = parseInt(ruc.charAt(2));
    var verify;
    if (ruc.length == 13) {
      if (type < 6) {
        return validarcedula(ruc.substr(0, 10));
      }
      if (type == 6) {
        if (
          parseInt(ruc.charAt(9)) +
            parseInt(ruc.charAt(10)) +
            parseInt(ruc.charAt(11)) +
            parseInt(ruc.charAt(12)) >
          0
        ) {
          var digito = ruc.charAt(8);
          for (let i = 0; i < 8; i++) {
            total += parseInt(ruc.charAt(i)) * coefPublic[i];
          }
          if (total % 11 == 0) verify = 0;
          else if (total % 11 == 1) return false;
          else verify = 11 - (total % 11);
          console.log(verify);
          console.log(digito);
          if (verify == parseInt(digito)) return true;
          else return false;
        } else return false;
      } else if (type == 9) {
        if (
          parseInt(ruc.charAt(10)) +
            parseInt(ruc.charAt(11)) +
            parseInt(ruc.charAt(12)) >
          0
        ) {
          var digito = ruc.charAt(9);
          for (let i = 0; i < 9; i++) {
            total += parseInt(ruc.charAt(i)) * coefJuridic[i];
          }
          if (total % 11 == 0) verify = 0;
          else if (total % 11 == 1) return false;
          else verify = 11 - (total % 11);
          console.log(verify);
          console.log(digito);
          if (verify == parseInt(digito)) return true;
          else return false;
        } else return false;
      }
      else return false
    }
    else return false
  }

  export function validarPass(pass: string) {
    const pattern = /^[A-Z0-9]{8,15}$/;
    return pattern.test(pass);
  }
  
  export function validarName(name: string) {
    const pattern = /^[a-zA-Z\s]+$/;
    return pattern.test(name);
  }
  export function validarCorreo(mail: string) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(mail);
  }
  export function validarTelefono(pass: string) {
    const pattern = /^[0-9]{8,15}$/;
    return pattern.test(pass);
  }