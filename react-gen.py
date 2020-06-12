var_name = input("Enter variable name: ")
var_cap = var_name.capitalize()
funcOutput = (
	f"const onChange{var_cap} = (new{var_cap}) => {{"
	f"setAttributes({{{var_name}: new{var_cap}}});"
	"};"
)
propOutput = f"value={{{var_name}}} onChange={{onChange{var_cap}}}"
print(funcOutput, end="\n")
print(propOutput)