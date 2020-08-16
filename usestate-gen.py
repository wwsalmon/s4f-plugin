var_name = input("Enter variable name: ")
var_cap = var_name[:1].upper() + var_name[1:]
output = (f"const [{var_name}, set{var_cap}] = useState('Loading...');")
print(output)