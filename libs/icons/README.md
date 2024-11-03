# Icons

That's an icon library. Here stored images, that added into project throw Icon component like this:

```TSX
import { UserIcon } from '@/icons';

<Icon icon={UserIcon} alt={'Your profile'} width={36} height={36} />

<Image image={src.image} fallback={UserIcon} alt={'Your profile'} width={36} height={36} />
```