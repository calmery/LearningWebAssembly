extern "C" {
    int fib( int n ){
        switch( n ){
            case 0: 
            	return 0;
            case 1: 
            	return 1;
            default: 
            	return fib( n - 2 ) + fib( n - 1 );
        }
    }
}