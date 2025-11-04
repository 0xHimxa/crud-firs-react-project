

import React from 'react'
import { Form } from 'react-router'

function CreatPost() {
  return (
    <div className='create-box'>
<div>
<div className='post-headers'>

<div className='img-user-name'>
    <img src="../../public/t.jpg" alt=""  />
<span>himxa</span>
</div>

<div className='save-btn'>
    <button>Save</button>
</div>


</div>


 <Form className='form-input'>

<textarea name="posts" id="" rows={10} cols={60}></textarea>

<button type='submit'> Post</button>

 </Form>



</div>



    </div>
  )
}

export default CreatPost