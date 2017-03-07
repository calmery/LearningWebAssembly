file=sample/sample.cpp

wasm:
	clang++ ${file} -emit-llvm --target=wasm32 -Oz -c -o ${file}.bc
	llc ${file}.bc -march=wasm32 -filetype=asm -o ${file}.s
	s2wasm ${file}.s > ${file}.wast
	sexpr-wasm ${file}.wast -o ${file}.wasm

clean:
	rm ${file}.bc ${file}.s ${file}.wast