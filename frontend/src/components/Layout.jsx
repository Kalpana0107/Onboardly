import React from 'react';
 // 'children' is a special React prop — whatever you put inside <Layout>...</Layout> // gets rendered here. Think of it like a picture frame. 
    function Layout({ children })
    { return ( 
    <div className='app-container'> <header
    className='navbar'> 
    <h1>ResumeScreener</h1> 
    <nav> 
        <a href='/'>Upload</a>
        <a href='/results'>Results</a>
    </nav> 
    </header> 

    <main className='main-content'> {children} {/* Pages slot in here */} </main> </div> );
    } export default Layout;