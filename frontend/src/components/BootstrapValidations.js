import React from 'react'

const BootstrapValidations = () => {
  return (
    <>
        {
          (function() {   
            window.addEventListener('load', () => {
            const forms = document.querySelectorAll('.needs-validation')
              Array.prototype.filter.call(forms, (form) => {
                form.addEventListener('submit', (event) => {
                  if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                  form.classList.add('was-validated');
                }, false);
              });
            }, false);
          })()
        }
    </>
  )
}

export default BootstrapValidations