package utils

import "strconv"

func StringToUint(str string) (uint, error) {
	num, err := strconv.ParseUint(str, 10, 16)
	if err != nil {
		return 0, err
	}
	return uint(num), nil
}
