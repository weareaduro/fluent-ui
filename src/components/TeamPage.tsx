import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState, type ReactElement } from 'react';
import { useTeam, type TeamMember } from '../signet/useTeam';
import { PageHeader } from './AppFrame';
import { DataTable } from './DataTable';
import { FullLoader } from './Loader';
import { Input } from './Input';
import { Modal, ModalFooter } from './Modal';
import { Select } from './Select';

const menuItemClassName = 'w-full rounded-[2px] px-2.5 py-2 text-left text-sm hover:bg-white/5';

export const TeamPage = ({
  onManageUser,
}: {
  onManageUser?: ((userUuid: string) => void) | undefined;
}): ReactElement => {
  const team = useTeam();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [search, setSearch] = useState('');
  const [inviting, setInviting] = useState(false);
  const query = search.trim().toLowerCase();
  const members = team.members.filter((member) => {
    if (query === '') return true;

    return member.email.toLowerCase().includes(query) || member.role.toLowerCase().includes(query);
  });

  const close = () => {
    setInviting(false);
    setEmail('');
    setRole('member');
  };

  if (!team.canManage) {
    return <p className="p-6 text-sm text-subtle">You do not have access to this team.</p>;
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <PageHeader
        title="Team"
        button={{ icon: PlusIcon, label: 'Invite', onClick: () => setInviting(true) }}
      />
      <div className="flex items-center justify-between gap-3 border-b border-grey-700t px-5 py-3">
        <div className="w-full sm:w-72">
          <Input
            Icon={MagnifyingGlassIcon}
            name="search"
            placeholder="Search for members"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <Modal
        open={inviting}
        onClose={close}
        title="Invite"
        footer={
          <ModalFooter
            onCancel={close}
            primaryDisabled={email.trim() === ''}
            primaryLabel="Invite"
            onPrimary={() => {
              void team
                .invite(email, role)
                .then(close)
                .catch(() => undefined);
            }}
          />
        }
      >
        <div className="flex flex-col gap-4">
          <Input label="Email" name="member-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Select label="Role" name="member-role" value={role} options={team.roleOptions} onChange={setRole} />
        </div>
      </Modal>
      <DataTable
        empty={team.pending ? <FullLoader /> : 'No members yet.'}
        rowKey={(member) => member.userUuid}
        rows={members}
        columns={[
          { cell: (member) => member.email, header: 'Email', key: 'email' },
          {
            cell: (member) => (
              <Select
                name={`member-role-${member.userUuid}`}
                widthClass="w-36"
                value={member.role}
                options={team.roleOptions}
                onChange={(next) => {
                  void team.updateRole(member.userUuid, next).catch(() => undefined);
                }}
              />
            ),
            header: 'Role',
            key: 'role',
          },
          {
            cell: (member) => (
              <MemberMenu
                member={member}
                onManage={onManageUser ? () => onManageUser(member.userUuid) : undefined}
                onRemove={() => void team.remove(member.userUuid).catch(() => undefined)}
              />
            ),
            header: '',
            key: 'actions',
          },
        ]}
      />
    </section>
  );
};

const MemberMenu = ({
  member,
  onManage,
  onRemove,
}: {
  member: TeamMember;
  onManage?: (() => void) | undefined;
  onRemove: () => void;
}): ReactElement => (
  <Menu>
    <MenuButton
      aria-label={`Actions for ${member.email}`}
      className="rounded-[2px] p-1 text-subtle outline-none hover:bg-white/5 hover:text-white"
    >
      <EllipsisVerticalIcon className="size-5" />
    </MenuButton>
    <MenuItems
      portal
      anchor={{ to: 'bottom end', gap: 6 }}
      className="z-50 flex min-w-44 flex-col rounded-[2px] border border-line bg-secondary p-1.5 text-white shadow-xl outline-none"
    >
      {onManage ? (
        <MenuItem>
          <button type="button" className={menuItemClassName} onClick={onManage}>
            Manage user
          </button>
        </MenuItem>
      ) : null}
      <MenuItem>
        <button type="button" className={menuItemClassName} onClick={onRemove}>
          Remove
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
);
