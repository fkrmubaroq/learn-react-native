import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableHighlight,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';
import ChevronIcon from 'src/components/icons/ChevronIcon';
import SearchIcon from 'src/components/icons/SearchIcon';
import {DATA_OPTION} from 'src/lib/constant';
import {useDebounce} from 'src/lib/hooks';
import {DataOptionType} from 'types/types';
import {z} from 'zod';

const initFormSchema = z.object({
  username: z.string(),
  password: z.string(),
  number: z.number(),
  email: z.string(),
  gender: z.string(),
  hobbies: z.array(z.string()),
  country: z.object({
    value: z.number(),
    text: z.string(),
  }),
});

const dataHobbies = ['Footbal', 'Hiking', 'Others'];
const initCountry = Object.freeze({
  value: 0,
  text: '',
});
const initForm = initFormSchema.parse({
  username: '',
  password: '',
  number: 0,
  email: '',
  gender: '',
  hobbies: [],
  country: initCountry,
});

type FormType = z.infer<typeof initFormSchema>;
export default function Form() {
  return (
    <View>
      <BasicForm />
    </View>
  );
}

function BasicForm() {
  const [form, setForm] = useState<FormType>(initForm);
  const onChangeInput = (name: string, value: string) => {
    setForm(state => ({...state, [name]: value}));
  };

  return (
    <Card title="Form Input" style={{rowGap: 20}}>
      <CardContent style={{rowGap: 15}}>
        <View>
          <Label>Username</Label>
          <Input
            placeholder="Username"
            value={form.username}
            name="username"
            onChangeValue={onChangeInput}
          />
        </View>
        <View>
          <Label>Password</Label>
          <Input
            secureTextEntry
            placeholder="Password"
            name="password"
            value={form.password}
            onChangeValue={onChangeInput}
          />
        </View>
        <View>
          <Label>Number</Label>
          <Input
            keyboardType="number-pad"
            placeholder="Number"
            name="number"
            value={form.number ? form.number.toString() : ''}
            onChangeValue={onChangeInput}
          />
        </View>
        <View>
          <Label>Email</Label>
          <Input
            keyboardType="email-address"
            placeholder="Email"
            name="email"
            value={form.email}
            onChangeValue={onChangeInput}
          />
        </View>

        <View style={{rowGap: 10}}>
          <Label>Gender</Label>
          <View style={{flexDirection: 'row', columnGap: 20}}>
            <Radio
              checked={form.gender === 'male'}
              onChange={() => setForm(state => ({...state, gender: 'male'}))}
              text="Male"
            />
            <Radio
              checked={form.gender === 'female'}
              onChange={() => setForm(state => ({...state, gender: 'female'}))}
              text="Female"
            />
          </View>
        </View>

        <View style={{rowGap: 10}}>
          <Label>Hobbies</Label>
          <View style={{flexDirection: 'row', columnGap: 20}}>
            {dataHobbies.map(hobby => (
              <Checkbox
                key={hobby}
                text={hobby}
                checked={form.hobbies.includes(hobby)}
                onChange={() => {
                  setForm(state => {
                    const hobbies = form.hobbies.includes(hobby)
                      ? state.hobbies.filter(h => h !== hobby)
                      : [...state.hobbies, hobby];
                    return {
                      ...state,
                      hobbies,
                    };
                  });
                }}
              />
            ))}
          </View>
        </View>

        <View style={{zIndex: 100}}>
          <Label>Country</Label>
          <SelectDropdown
            options={DATA_OPTION}
            value={form.country?.text}
            onSelectOption={selected => {
              setForm(state => ({...state, country: selected}));
            }}
            onClear={() => setForm(state => ({...state, country: initCountry}))}
          />
        </View>

        <Button text="Submit" />
      </CardContent>
    </Card>
  );
}

function Label({children}: {children: React.ReactNode}) {
  return (
    <View>
      <Text style={styles.label}>{children}</Text>
    </View>
  );
}

function Input({
  onChangeValue,
  value,
  name,
  ...props
}: TextInputProps & {
  name: string;
  onChangeValue: (name: string, text: string) => void;
  value: string;
}) {
  return (
    <TextInput
      {...props}
      style={styles.input}
      defaultValue={value || ''}
      onChangeText={text => onChangeValue(name, text)}
    />
  );
}

const radioStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
  containerText: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 11,
    color: '#555',
  },
});

function Radio({
  checked,
  onChange,
  text,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  text: string;
}) {
  return (
    <TouchableOpacity
      style={radioStyle.container}
      onPress={() => onChange(!checked)}>
      <View style={[radioStyle.radio, checked && {borderColor: 'blue'}]}>
        {checked ? <View style={radioStyle.checked} /> : <></>}
      </View>
      {text ? (
        <View style={radioStyle.containerText}>
          <Text style={radioStyle.text}>{text}</Text>
        </View>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
}

const checkboxStyle = StyleSheet.create({
  container: {
    columnGap: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCheckboxChecked: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  containerLine: {
    marginTop: -2.5,
    marginLeft: 2,
  },
  line1: {
    position: 'absolute',
    left: -5,
    top: 0,
    width: 1.6,
    height: 5,
    backgroundColor: 'white',
    transform: [{rotate: '130deg'}],
  },
  line2: {
    position: 'absolute',
    left: 0,
    top: -4,
    width: 1.6,
    height: 10,
    backgroundColor: 'white',
    transform: [{rotate: '40deg'}],
  },
  text: {
    fontSize: 11,
    color: '#555',
  },
});

function Checkbox({
  checked = true,
  onChange,
  text,
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  text?: string;
}) {
  return (
    <TouchableOpacity
      style={checkboxStyle.container}
      onPress={() => onChange && onChange(!checked)}>
      <View
        style={[
          checkboxStyle.containerCheckbox,
          checked && checkboxStyle.containerCheckboxChecked,
        ]}>
        {checked ? (
          <View style={checkboxStyle.containerLine}>
            <View style={checkboxStyle.line1} />
            <View style={checkboxStyle.line2} />
          </View>
        ) : (
          <></>
        )}
      </View>
      {text ? (
        <View>
          <Text style={checkboxStyle.text}>{text}</Text>
        </View>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
}

const buttonStyle = StyleSheet.create({
  container: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {color: 'white', fontWeight: '500'},
});
function Button({text, ...props}: TouchableOpacityProps & {text: string}) {
  return (
    <TouchableOpacity style={buttonStyle.container} {...props}>
      <Text style={buttonStyle.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

function Card({title, children}: ViewProps & {title: string}) {
  return (
    <View style={styles.containerCard}>
      <Text style={styles.title}>{title}</Text>

      {children}
    </View>
  );
}

function CardContent({children, style}: ViewProps) {
  return <View style={style}>{children}</View>;
}

const styles = StyleSheet.create({
  containerCard: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#555',
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 7,
    paddingVertical: 9,
    marginTop: 5,
    fontSize: 12,
  },
});

const selectDropdownStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    paddingVertical: 5,
    marginTop: 5,
    fontSize: 12,
    height: 35,
    justifyContent: 'center',
  },
  placeholder: {
    color: '#aaa',
    fontSize: 12,
  },
  rightSide: {
    position: 'absolute',
    flexDirection: 'row',
    columnGap: 10,
    top: -1,
    right: 7,
  },
  icon: {
    width: 15,
    height: 15,
  },
  clearIcon: {
    position: 'absolute',
    top: -1,
    right: 10,
  },
});
function SelectDropdown({
  onSelectOption,
  options,
  value,
  onClear,
}: {
  onSelectOption: (selected: DataOptionType) => void;
  options: DataOptionType[];
  value: string;
  onClear: () => void;
}) {
  const [opened, setOpened] = useState<boolean>(false);

  const onPress = () => setOpened(!opened);

  const onSelect = (selected: DataOptionType) => {
    setOpened(false);
    onSelectOption(selected);
  };
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={selectDropdownStyle.container}
        onPress={onPress}>
        <View>
          {value ? (
            <View>
              <Text style={{fontSize: 12}}>{value}</Text>
            </View>
          ) : (
            <Text style={selectDropdownStyle.placeholder}>Pilih Negara</Text>
          )}
          <View style={selectDropdownStyle.rightSide}>
            {value && <ClearSelected onClear={onClear} />}
            <ChevronIcon
              width={17}
              height={17}
              rotate={opened ? 'top' : 'bottom'}
            />
          </View>
        </View>
      </TouchableOpacity>
      {opened && <DropdownItem data={options} onSelect={onSelect} />}
    </View>
  );
}

const dropdownItemStyle = StyleSheet.create({
  container: {
    maxHeight: 200,
    backgroundColor: 'white',
    paddingVertical: 7,
    borderRadius: 3,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,
    shadowColor: '#807777',
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  itemText: {
    color: '#212529',
    fontSize: 12,
  },
});
function DropdownItem({
  onSelect,
  data,
}: {
  data: DataOptionType[];
  onSelect: (selected: DataOptionType) => void;
}) {
  const [search, setSearch] = useState<string>('');

  const filter = search
    ? data.filter(item =>
        item.text.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      )
    : data;
  return (
    <View style={dropdownItemStyle.container}>
      <SearchDataOption value={search} onChange={setSearch} />
      {!filter.length ? (
        <EmptyData />
      ) : (
        <FlatList
          data={filter}
          renderItem={({item}) => (
            <TouchableHighlight
              underlayColor={'#ccc'}
              style={dropdownItemStyle.item}
              onPress={() => onSelect(item)}>
              <Text style={dropdownItemStyle.itemText}>{item.text}</Text>
            </TouchableHighlight>
          )}
        />
      )}
    </View>
  );
}

const searchDataOptionStyle = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    paddingLeft: 7,
    fontSize: 12,
    borderRadius: 5,
    height: 32,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 16.5,
  },
  empty: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 6,
  },
});

function SearchDataOption({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [search, setSearch] = useState<string>(value);
  const debounceValue = useDebounce(search, 1000);

  // on debounceValue same as search, call function onChange
  useEffect(() => {
    if (search !== debounceValue) {
      return;
    }
    console.log('xaxax');
    onChange(debounceValue);
  }, [debounceValue, onChange, search]);

  const handleSearch = (text: string) => {
    setSearch(text);
  };
  return (
    <View style={searchDataOptionStyle.container}>
      <TextInput
        style={searchDataOptionStyle.input}
        placeholder="Cari"
        defaultValue={search}
        value={search}
        onChangeText={handleSearch}
      />
      <SearchIcon style={searchDataOptionStyle.icon} width={18} height={18} />
    </View>
  );
}

const clearSelectedStyle = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 8,
    color: '#777',
    fontWeight: '900',
  },
});

function ClearSelected({onClear}: {onClear: () => void}) {
  return (
    <TouchableOpacity
      style={clearSelectedStyle.container}
      onPress={() => onClear()}>
      <Text style={clearSelectedStyle.text}>X</Text>
    </TouchableOpacity>
  );
}

function EmptyData() {
  return (
    <View>
      <Text style={searchDataOptionStyle.empty}>Pilihan tidak ditemukan</Text>
    </View>
  );
}
