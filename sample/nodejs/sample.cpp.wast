(module
  (func $fib (param $0 i32) (result i32)
    (block $label$0
      (br_if $label$0
        (i32.ge_u
          (get_local $0)
          (i32.const 2)
        )
      )
      (return
        (get_local $0)
      )
    )
    (i32.add
      (call $fib
        (i32.add
          (get_local $0)
          (i32.const -2)
        )
      )
      (call $fib
        (i32.add
          (get_local $0)
          (i32.const -1)
        )
      )
    )
  )
  (export "fib" $fib)
)
