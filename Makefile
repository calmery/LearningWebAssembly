path=sample
file=sample.cpp

canary=canary
nodejs=nodejs

canary:
	clang++ ${path}/${file} -emit-llvm --target=wasm32 -Oz -c -o ${path}/${canary}/${file}.bc
	llc ${path}/${canary}/${file}.bc -march=wasm32 -filetype=asm -o ${path}/${canary}/${file}.s
	s2wasm ${path}/${canary}/${file}.s > ${path}/${canary}/${file}.wast
	sexpr-wasm ${path}/${canary}/${file}.wast -o ${path}/${canary}/${file}.wasm

clean:
	rm ${path}/${canary}/${file}.bc ${path}/${canary}/${file}.s ${path}/${canary}/${file}.wast